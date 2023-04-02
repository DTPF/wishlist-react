import { useReducer } from "react";
import {
	initGetUserAction
} from "reducers/user/user.actions";
import UserContext from "./UserContext";
import userReducer from "reducers/user/user.reducer";
import initialUserState from "./initialUserState";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  children: React.ReactNode
}

export default function UserProvider(props: Props) {
	const { children } = props;
	const [userState, dispatch] = useReducer(userReducer, initialUserState);
	const { getIdTokenClaims, isAuthenticated } = useAuth0();

	const initGetUser = function () {
		getIdTokenClaims().then(auth0User => {
			initGetUserAction(dispatch, isAuthenticated, auth0User);
		})
	}

	return (
		<UserContext.Provider value={{
			...userState,
			initGetUser,
		}}>
			{children}
		</UserContext.Provider>
	)
}