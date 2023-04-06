import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
	initGetUserAction
} from "reducers/user/user.actions";
import UserContext from "./UserContext";
import userReducer from "reducers/user/user.reducer";
import initialUserState from "./initialUserState";

type Props = {
	children: React.ReactNode
}

export default function UserProvider(props: Props) {
	const { children } = props;
	const [userState, dispatch] = useReducer(userReducer, initialUserState);
	const { getIdTokenClaims, isAuthenticated } = useAuth0();

	useEffect(() => {
		initGetUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])

	const initGetUser = useCallback(() => {
		getIdTokenClaims().then(auth0User => {
			initGetUserAction(dispatch, isAuthenticated, auth0User);
		});
	}, [getIdTokenClaims, isAuthenticated]);

	const memoProvider = useMemo(
		() => ({
			...userState,
			initGetUser
		}),
		[userState, initGetUser]
	);

	return (
		<UserContext.Provider value={memoProvider}>
			{children}
		</UserContext.Provider>
	)
}