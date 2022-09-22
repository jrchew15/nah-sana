import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToWorkspace } from "../../../store/workspace";
import { useHistory, useParams } from "react-router-dom";
import './AddUser.css'



const AddUser = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [email, setEmail] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const getUsers = useSelector(state => state.workspace.users)
    const users = Object.values(getUsers)


    useEffect(() => {
        const errors = []
        if (!email.length) errors.push('Email name is required')
        users.filter(user => {
            if (user.email === email) {
                errors.push('User is already in workspace')
            }
        })
        setValidationErrors(errors)

    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const user = {
            email
        }
        if (!validationErrors.length) {

            const data = await dispatch(addUserToWorkspace(user, id))
            if (data) {
                setValidationErrors(data)
                // await setShowModal(true)
            }
        }
    }
    return (
        <>
            <div className="form-container">
                <div className="add-user-title-div">
                    <h2 className="add-user-title">Add Member to Workspace</h2>
                    <button className="create-button" onClick={() => setShowModal(false)}>X</button>

                </div>

                {hasSubmitted && validationErrors.length > 0 && (<div className='errorContainer project-errors'>
                    {validationErrors.map((error, ind) => (
                        <div key={ind} className='errorText'>{error.split(":")[1]}</div>
                    ))}
                </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="label-container-create">
                        <label className="workspace-label">
                            User Email :
                            <input
                                className="workspace-input"
                                required
                                maxLength={41}
                                type='email'
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="button-container-create">
                        <button className='submit-create-workspace' type="submit" >Add Member</button>
                    </div>

                </form>
            </div>
        </>
    )

}
export default AddUser
