import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserToWorkspace } from "../../../store/workspace";
import { useHistory, useParams } from "react-router-dom";



const AddUser = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [email, setEmail] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {

        const errors = []
        if (!email.length) errors.push('Email name is required')
        setValidationErrors(errors)
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        const user = {
            email
        }
        if (!validationErrors.length) {
            dispatch(addUserToWorkspace(user, id))
        }
        const data = await dispatch(addUserToWorkspace(user, id));
        if (data) {
            setValidationErrors(data)
        }
    }
    return (
        <>
            <h2>Add Member to Workspace</h2>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    <ul style={{ padding: '10px', color: 'red', listStyle: 'none' }}>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label>
                    User Email :
                    <input
                        required
                        maxLength={41}
                        type='email'
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <button type="submit"
                    style={{ borderRadius: '50%', height: '60px', width: '60px', background: 'purple', color: 'white' }}
                >Add</button>

            </form>
        </>
    )

}
export default AddUser
