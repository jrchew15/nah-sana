import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { workspaceUpdate } from "../../store/workspace";
import { useHistory, useParams } from "react-router-dom";




const UpdateWorkspace = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    // const workspaceId = workspace.workspace.id

    const workspaces = useSelector(state => state.workspace.workspace)
    const [name, setName] = useState(workspaces.name)
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {

        const errors = []
        if (!name.length) errors.push('Workspace name is required')
        setValidationErrors(errors)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        const workspace = {
            name
        }
        if (!validationErrors.length) {
            dispatch(workspaceUpdate(workspace, id))
        }
    }
    return (
        <>
            <h2>Update Workspace</h2>
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
                <button type="submit">Update</button>
            </form>
        </>
    )

}
export default UpdateWorkspace
