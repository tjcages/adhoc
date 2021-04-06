import { RiDashboardFill } from "react-icons/ri";

export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="sidebar-main">
                <div className="sidebar-button">
                    <RiDashboardFill className="sidebar-icon" />
                </div>
            </div>
            <div className="sidebar-user">
                sidebar
            </div>
        </div>
    )
}