import { createContext, useRef, useState } from 'react';

export const DropdownHandlingContext = createContext();

export const DropdownHandlingProvider = props => {
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)
    const profileDropdownRef = useRef(null);


    const [createDropdownOpen, setCreateDropdownOpen] = useState(false)
    const createDropdownRef = useRef(null);


    const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false)
    const workspaceDropdownRef = useRef(null);


    const [developerDropdownOpen, setDeveloperDropdownOpen] = useState(false)
    const developerDropdownRef = useRef(null);


    function dropdownChecks(e) {
        if (profileDropdownRef && userDropdownOpen) {
            if (e.target !== profileDropdownRef.current) {
                setUserDropdownOpen(false)
            }
        }
        if (createDropdownOpen && createDropdownRef) {
            if (e.target !== createDropdownRef.current) {
                setCreateDropdownOpen(false)
            }
        }
        if (workspaceDropdownOpen && workspaceDropdownRef) {
            if (e.target !== workspaceDropdownRef.current) {
                setWorkspaceDropdownOpen(false)
            }
        }
        if (developerDropdownOpen && developerDropdownRef) {

            if (e.target !== developerDropdownRef.current) {
                setDeveloperDropdownOpen(false)
            }
        }
    }

    const allvals = {
        userDropdownOpen, setUserDropdownOpen,
        createDropdownOpen, setCreateDropdownOpen,
        workspaceDropdownOpen, setWorkspaceDropdownOpen,
        developerDropdownOpen, setDeveloperDropdownOpen,
        dropdownChecks
    }

    return (
        <DropdownHandlingContext.Provider value={{ ...allvals }}>
            {props.children}
        </DropdownHandlingContext.Provider>
    )
}
