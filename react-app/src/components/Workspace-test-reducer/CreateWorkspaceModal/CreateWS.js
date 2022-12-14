import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { workspaceCreate } from "../../../store/workspace";
import './createWS.css'
import { authenticate } from "../../../store/session";

const CreateWorkspace = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const currentUser = useSelector(state => state.session.user);
    let workspaceArr = currentUser.workspaces


    useEffect(() => {

        const errors = []
        if (!name.length) errors.push('error: Workspace name is required')
        workspaceArr.filter(wkspace => {
            if (name.toLowerCase() === wkspace.name.toLowerCase()) {
                errors.push('error: Workspace name already exists')
            }
        })
        setValidationErrors(errors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        const workspace = {
            name
        }
        if (!validationErrors.length) {
            let newWorkspace = await dispatch(workspaceCreate(workspace))
            if (newWorkspace) {
                await dispatch(authenticate())
                history.push(`/workspaces/${newWorkspace.id}`)

                setShowModal(false)

            }
        }
    }
    return (
        <>
            <div className="form-container">
                <div className="top-create-form">
                    <h2 className="create-title">Create Your Workspace</h2>
                    <button className="create-button" onClick={() => setShowModal(false)}>X</button>
                </div>
                <div>

                    {hasSubmitted && validationErrors.length > 0 && (<div className='errorContainer project-errors'>
                        {validationErrors.map((error, ind) => (
                            <div key={ind} className='errorText'>{error.split(":")[1]}</div>
                        ))}
                    </div>)}
                    <form onSubmit={handleSubmit}>
                        <div className="label-container-create">
                            <label className="workspace-label">
                                Workspace Name
                                <input
                                    className="workspace-input"
                                    maxLength={41}
                                    type='text'
                                    placeholder="Company or Team Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="button-container-create">
                            <button className='submit-create-workspace' type="submit" >Create Workspace</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}
export default CreateWorkspace
