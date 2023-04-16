import { useState } from 'react'
import AppSettingsModalContext from './AppSettingsModalContext'

export default function AppSettingsModalProvider({ children }: any) {
	const [openSettingsModal, setOpenSettingsModal] = useState(false)

	return (
		<AppSettingsModalContext.Provider value={{ openSettingsModal, setOpenSettingsModal }}>
			{children}
		</AppSettingsModalContext.Provider>
	)
}