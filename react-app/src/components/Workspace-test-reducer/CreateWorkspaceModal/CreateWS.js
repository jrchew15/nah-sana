import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { workspaceCreate } from "../../../store/workspace";


const CreateWorkspace = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const currentUser = useSelector(state => state.session.user);
    // const currentWorkspace = useSelector(state => state.workspace.workspace);
    console.log(currentUser)
    console.log(currentUser.workspaces, '------')
    let workspaceArr = currentUser.workspaces


    useEffect(() => {

        const errors = []
        if (!name.length) errors.push('Workspace name is required')
        workspaceArr.filter(wkspace => {
            if (name === wkspace.name) {
                errors.push(['Workspace name already exists'])
            }
        })
        setValidationErrors(errors)
    }, [name, workspaceArr])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        const workspace = {
            name
        }
        if (!validationErrors.length) {
            let newWorkspace = await dispatch(workspaceCreate(workspace))
            if (newWorkspace) {
                history.push(`/workspaces/${newWorkspace.id}`)
                setShowModal(false)

            }
        }
    }
    return (
        <>
            <h2>Create Workspace</h2>
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
                    Workspace Name :
                    <input
                        maxLength={41}
                        type='text'
                        placeholder="Company or Team Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                {/* <label>
                    Add User :
                    <input
                        maxLength={41}
                        type='email'
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label> */}
                <button type="submit"
                    style={{ borderRadius: '50%', height: '60px', width: '60px', background: 'purple', color: 'white' }}
                >Create</button>

            </form>
        </>
    )

}
export default CreateWorkspace
