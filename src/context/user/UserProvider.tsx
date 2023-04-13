import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
	initGetUserAction,
	updateUserAction
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
	const { getIdTokenClaims, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
	
	useEffect(() => {
		initGetUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])

	const initGetUser = useCallback(async () => {
		const token = await getIdTokenClaims()
		if (!isLoading && isAuthenticated) {
			initGetUserAction(dispatch, isAuthenticated, token, loginWithRedirect);
		}
	}, [getIdTokenClaims, isAuthenticated, isLoading, loginWithRedirect]);

	const updateUser = useCallback(async (data: any) => {
		const token = await getIdTokenClaims()
		if (!isLoading && isAuthenticated) {
			updateUserAction(dispatch, userState.dbUser._id, data, token);
		}
	}, [getIdTokenClaims, isAuthenticated, userState, isLoading]);

	const memoProvider = useMemo(
		() => ({
			...userState,
			initGetUser,
			updateUser
		}),
		[userState, initGetUser, updateUser]
	);

	return (
		<UserContext.Provider value={memoProvider}>
			{children}
		</UserContext.Provider>
	)
}