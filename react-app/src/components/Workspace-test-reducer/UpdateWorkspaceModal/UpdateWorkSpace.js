import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { workspaceUpdate } from "../../../store/workspace"
import { useHistory, useParams } from "react-router-dom";
import { authenticate } from "../../../store/session";




const UpdateWorkspace = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    // const workspaceId = workspace.workspace.id

    const workspaces = useSelector(state => state.workspace.workspace)
    const [name, setName] = useState(workspaces.name)
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const currentUser = useSelector(state => state.session.user);
    let workspaceArr = currentUser.workspaces
    useEffect(() => {

        const errors = []
        if (!name.length) errors.push('error: Workspace name already exists')
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
            await dispatch(workspaceUpdate(workspace, id))
            await dispatch(authenticate())

            setShowModal(false)

        }
    }
    return (
        <>
            <div className="form-container">
                <div className="top-create-form">
                    <h2 className="create-title">Update Your Workspace</h2>
                    <button className="create-button" onClick={() => setShowModal(false)}>X</button>
                </div>
                <div>
                    {hasSubmitted && validationErrors.length > 0 && (<div className='errorContainer project-errors'>
                        {validationErrors.map((error, ind) => (
                            <div key={ind} className='errorText'>{error.split(":")[1]}</div>
                        ))}
                    </div>)}

                    {/* {hasSubmitted && validationErrors.length > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <ul style={{ margin: '0', color: 'red', listStyle: 'none', padding: '10px' }}>
                                {validationErrors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )} */}
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
                            <button className='submit-create-workspace' type="submit" >Update Workspace</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )

}
export default UpdateWorkspace
