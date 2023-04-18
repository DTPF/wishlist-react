import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as action from "reducers/user/user.actions";
import UserContext from "./UserContext";
import userReducer from "reducers/user/user.reducer";
import initialUserState from "./initialUserState";
import { useTranslation } from "react-i18next";
import { ChildrenProps } from "interfaces/globals";

export default function UserProvider(props: ChildrenProps) {
	const { children } = props;
	const [userState, dispatch] = useReducer(userReducer, initialUserState);
	const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
	const { i18n } = useTranslation();

	useEffect(() => {
		initGetUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isLoading])

	const initGetUser = useCallback(async () => {
		const token = await getIdTokenClaims()
		action.initGetUserAction(dispatch, isAuthenticated, token, i18n, isLoading);
	}, [getIdTokenClaims, isAuthenticated, isLoading, i18n]);

	const updateUser = useCallback(async (data: any) => {
		const token = await getIdTokenClaims()
		if (!isLoading && isAuthenticated) {
			action.updateUserAction(dispatch, userState.dbUser._id, data, token);
		}
	}, [getIdTokenClaims, isAuthenticated, userState, isLoading]);

	const changeLanguage = useCallback(async (data: any) => {
		const token = await getIdTokenClaims()
		if (!isLoading && isAuthenticated) {
			action.changeLanguageAction(dispatch, userState.dbUser._id, data, token);
		}
	}, [getIdTokenClaims, isAuthenticated, userState, isLoading]);

	const memoProvider = useMemo(
		() => ({
			...userState,
			initGetUser,
			updateUser,
			changeLanguage
		}),
		[userState, initGetUser, updateUser, changeLanguage]
	);

	return (
		<UserContext.Provider value={memoProvider}>
			{children}
		</UserContext.Provider>
	)
}