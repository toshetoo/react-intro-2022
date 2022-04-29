import { Route, Routes } from "react-router-dom";
import { User } from "../users/user/User";
import { UsersList } from "../users/users-list/UsersList";

export function Main() {
    return (
        <div className="main-content">
            <Routes>
                <Route exact path="/users-list" element={<UsersList />} />
                <Route path="/user/:id" element={<User />} />
            </Routes>
        </div>
    )
}