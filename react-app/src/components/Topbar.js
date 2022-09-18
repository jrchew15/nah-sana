export default function Topbar({ toggleNavbarDisplay }) {
    return (
        <div id='topbar'>
            <i class="fas fa-bars" onClick={toggleNavbarDisplay} />
        </div>
    )
}
