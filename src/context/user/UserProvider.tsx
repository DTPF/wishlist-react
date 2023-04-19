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
		const initGetUser = async () => {
			const token = await getIdTokenClaims()
			action.initGetUserAction(dispatch, isAuthenticated, token, i18n, isLoading);
		}
		initGetUser()
	}, [isAuthenticated, isLoading, i18n, getIdTokenClaims])

	const updateUser = useCallback(async (data: any) => {
		if (!isLoading && isAuthenticated) {
			const token = await getIdTokenClaims()
			action.updateUserAction(dispatch, userState.dbUser._id, data, token);
		}
	}, [isAuthenticated, userState, isLoading, getIdTokenClaims]);

	const changeLanguage = useCallback(async (data: any) => {
		if (!isLoading && isAuthenticated) {
			const token = await getIdTokenClaims()
			action.changeLanguageAction(dispatch, data, token);
		}
	}, [isAuthenticated, isLoading, getIdTokenClaims]);

	const memoProvider = useMemo(
		() => ({
			...userState,
			updateUser,
			changeLanguage
		}),
		[userState, updateUser, changeLanguage]
	);

	return (
		<UserContext.Provider value={memoProvider}>
			{children}
		</UserContext.Provider>
	)
}