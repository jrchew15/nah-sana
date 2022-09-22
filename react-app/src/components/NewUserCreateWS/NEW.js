import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { workspaceCreate } from "../../store/workspace";
import './NEW.css'
import { authenticate } from "../../store/session";

const NewUserWorkspace = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [changeB, setChangeB] = useState('project-select-class')


    useEffect(() => {

        const errors = []
        if (!name.length) errors.push('error: Workspace name is required')
        if (name.length > 0) {
            setChangeB('test')
        }
        if (name.length === 0) {
            setChangeB('project-submit-button')
        }
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


            }
        }
    }
    return (
        <>
            <div className="user-form-container">
                <div className="user-top-create-form">
                    <h2 className="user-newuser-title">Create Your  First Workspace</h2>
                </div>
                <div>
                    {hasSubmitted && validationErrors.length > 0 && (<div className='errorContainer project-errors'>
                        {validationErrors.map((error, ind) => (
                            <div key={ind} className='errorText'>{error.split(":")[1]}</div>
                        ))}
                    </div>
                    )}
                    <div className="word-div-intro">
                        <h3 className="user-intro">Welcome to Nah-sana!</h3>
                        <p className="user-intro">Welcome to Nah-sana! Where planning your next project is as easy as clicking a buttton.
                            To continue please create your very first Workspace. Once created you will be able to create projects, assign tasks,
                            and add collaborators. </p>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="user-label-container-create">
                            <label className="user-workspace-label">
                                Workspace Name
                                <input
                                    className="user-workspace-input"
                                    maxLength={41}
                                    type='text'
                                    placeholder="Company or Team Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="user-button-container-create">
                            <button className={changeB} type="submit" >Create Workspace</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}
export default NewUserWorkspace
