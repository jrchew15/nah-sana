import LogoutButton from "./auth/LogoutButton"

export default function DevOnlyContent({ workspace }) {
    return <>
        <ul>
            <li>
                <ul>Projects:
                    {workspace.projects.map(project => (
                        <li>{project.name}</li>
                    ))}
                </ul>
            </li>
            <li>
                <ul>Users:
                    {workspace.users.map(user => (
                        <li>{user.firstName} {user.lastName}</li>
                    ))}
                </ul>
            </li>
            <li>
                <ul>Tasks:
                    {workspace.tasks.map(task => (
                        <li>{task.name}</li>
                    ))}
                </ul>
            </li>
        </ul>
        <LogoutButton />
    </>
}
