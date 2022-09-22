export const colorObj = {
    '1': '#ff6666',
    '2': '#00ff99',
    '3': '#6666ff',
    '4': '#cc66ff',
    '5': '#ffcc00',
    '6': '#ccff33'
}

export default function UserIcon({ user, clickHandler }) {
    const imageNum = user.image[21] // static/images/users/num.png
    return (
        <div className="userIcon" onClick={clickHandler} style={{ backgroundColor: colorObj[imageNum] }}>
            {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
        </div>
    )
}

export function ProjectLi({ project, clickHandler }) {
    const imageNum = project.icon[21]
    const dotStyle = {
        margin: '8px',
        borderRadius: '50%',
        backgroundColor: colorObj[imageNum],
        height: '7px',
        width: '7px',
    }


    return (
        <li key={project.id} onClick={clickHandler}>
            <div style={dotStyle} />
            {project.name}
        </li>
    )
}
