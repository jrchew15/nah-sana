import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { workspaceCreate } from "../../store/workspace";


const CreateWorkspace = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
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
            dispatch(workspaceCreate(workspace))
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
                <button type="submit">Create</button>

            </form>
        </>
    )

}
export default CreateWorkspace
