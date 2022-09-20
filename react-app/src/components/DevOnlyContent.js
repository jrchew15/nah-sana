import LogoutButton from "./auth/LogoutButton"

export default function DevOnlyContent({ workspace }) {
    return <>
        <ul>
            <li>
                <ul>Workspace :
                    <li>{workspace.workspace.name}</li>
                </ul>
            </li>
            <li>
                <ul>Projects:
                    {workspace.projects.map(project => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>
            </li>
            <li>
                <ul>Users:
                    {workspace.users.map(user => (
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                    ))}
                </ul>
            </li>
            <li>
                <ul>Tasks:
                    {workspace.tasks.map(task => (
                        <li key={task.id}>{task.name}</li>
                    ))}
                </ul>
            </li>
        </ul>
        <LogoutButton />
    </>
}
