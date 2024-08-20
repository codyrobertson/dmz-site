import { addPropertyControls, ControlType } from "framer"
import { useState, useEffect, useRef } from "react"

export default function DynamicPropViewer(props) {
    const { initialImportStatement } = props
    const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    const [importStatement, setImportStatement] = useState(
        initialImportStatement
    )
    const [Component, setComponent] = useState(null)
    const [componentProps, setComponentProps] = useState({})
    const [error, setError] = useState(null)
    const [highlightedProp, setHighlightedProp] = useState(null)
    const [activeTab, setActiveTab] = useState("preview")
    const [isEditing, setIsEditing] = useState(false) // State for read/write toggle
    const previewRef = useRef(null)

    const colors = {
        background: isDarkMode ? "bg-gray-800" : "bg-gray-100",
        cardBackground: isDarkMode ? "bg-gray-700" : "bg-white",
        text: isDarkMode ? "text-gray-100" : "text-gray-800",
        border: isDarkMode ? "border-gray-600" : "border-gray-300",
        headerBg: isDarkMode ? "bg-gray-600" : "bg-gray-300",
        buttonBg: isDarkMode ? "bg-gray-600" : "bg-gray-300",
        buttonText: isDarkMode ? "text-gray-100" : "text-gray-800",
        highlightBg: isDarkMode ? "bg-gray-500" : "bg-gray-200", // Different color for row highlight
        activeTabBg: isDarkMode ? "bg-purple-700" : "bg-purple-500", // Brighter color for active tab
        inputText: isDarkMode ? "text-black" : "text-black", // Ensure input text is readable
    }

    useEffect(() => {
        loadComponent(importStatement)
    }, [importStatement])

    useEffect(() => {
        const link = document.createElement("link")
        link.href =
            "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        link.rel = "stylesheet"
        document.head.appendChild(link)
        return () => {
            document.head.removeChild(link)
        }
    }, [])

    const loadComponent = async (statement) => {
        try {
            // Validate and format import statement
            const match = statement.match(/https?:\/\/[^"]+/)
            if (!match) throw new Error("Invalid import statement format")
            const modulePath = match[0]

            // Use dynamic import with a relative path
            const module = await import(`${modulePath.replace(/\.js$/, "")}/index.js`)
            const ImportedComponent =
                module.default || module[Object.keys(module)[0]]
            setComponent(() => ImportedComponent)
            setComponentProps(ImportedComponent.defaultProps || {})
            setError(null)
        } catch (err) {
            setError(`Error loading component: ${err.message}`)
            setComponent(null) // Ensure Component is set to null on error
        }
    }

    const renderValue = (value) => {
        if (typeof value === "function") return "function() { ... }"
        if (typeof value === "object" && value !== null)
            return JSON.stringify(value)
        return String(value)
    }

    const handleInputChange = (key, value) => {
        setComponentProps((prevProps) => ({
            ...prevProps,
            [key]: value,
        }))
    }

    const getComponentCode = () => {
        const propsString = Object.entries(componentProps)
            .map(([key, value]) => `${key}={${renderValue(value)}}`)
            .join(" ")
        return `<Component ${propsString} />`
    }

    const getComponentCSS = () => {
        return `
      .component {
        ${Object.entries(componentProps)
            .filter(
                ([key, value]) =>
                    typeof value === "number" || typeof value === "string"
            )
            .map(([key, value]) => `  ${key}: ${value};`)
            .join("\n")}
      }
    `.trim()
    }

    const highlightProp = (prop) => {
        setHighlightedProp(prop)
        if (previewRef.current) {
            const element = previewRef.current.querySelector(
                `[data-prop="${prop}"]`
            )
            if (element) {
                const rect = element.getBoundingClientRect()
                const highlight = document.createElement("div")
                highlight.style.position = "absolute"
                highlight.style.top = `${rect.top}px`
                highlight.style.left = `${rect.left}px`
                highlight.style.width = `${rect.width}px`
                highlight.style.height = `${rect.height}px`
                highlight.style.border = "2px solid red"
                highlight.style.pointerEvents = "none"
                highlight.style.zIndex = "1000"
                document.body.appendChild(highlight)
                return () => document.body.removeChild(highlight)
            }
        }
    }

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value)
    }

    return (
        <div
            className={`p-6 rounded-lg shadow-lg max-w-4xl mx-auto ${colors.background} ${colors.text}`}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                    Dynamic Component Prop Viewer
                </h2>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isEditing}
                        onChange={() => setIsEditing(!isEditing)}
                        className="mr-2"
                    />
                    {isEditing ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.860978 8.43164C0.954728 8.10352 1.14223 7.79883 1.3766 7.56445L8.5016 0.439453C9.08754 -0.146484 10.0485 -0.146484 10.6344 0.439453L11.5485 1.35352C11.6188 1.42383 11.6891 1.51758 11.736 1.58789C12.1344 2.17383 12.0641 2.9707 11.5485 3.48633L4.42348 10.6113C4.40004 10.6348 4.35317 10.6582 4.32973 10.7051C4.09535 10.8926 3.83754 11.0332 3.55629 11.127L0.720353 11.9473C0.532853 12.0176 0.321916 11.9707 0.181291 11.8066C0.0172281 11.666 -0.0296469 11.4551 0.0172281 11.2676L0.860978 8.43164ZM1.40004 10.5879L3.22817 10.0488C3.27504 10.0254 3.34535 10.002 3.39223 9.97852L2.54848 9.81445C2.36098 9.76758 2.19692 9.62695 2.17348 9.43945L2.00942 8.5957C1.98598 8.64258 1.96254 8.71289 1.9391 8.75977L1.40004 10.5879ZM4.23598 9.20508L8.99379 4.44727L7.51723 2.99414L2.78285 7.75195L3.01723 8.94727L4.23598 9.20508Z" fill="black"/>
                        </svg>
                    ) : (
                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 8.75C10.5 9.24219 10.1719 9.66406 9.75 9.82812V11.375H9.9375C10.2422 11.375 10.5 11.6328 10.5 11.9375C10.5 12.2656 10.2422 12.5 9.9375 12.5H1.875C0.820312 12.5 0 11.6797 0 10.625V2.375C0 1.34375 0.820312 0.5 1.875 0.5H9.375C9.98438 0.5 10.5 1.01562 10.5 1.625V8.75ZM8.625 11.375V9.875H1.875C1.45312 9.875 1.125 10.2266 1.125 10.625C1.125 11.0469 1.45312 11.375 1.875 11.375H8.625ZM9.375 8.75V1.625H1.875C1.45312 1.625 1.125 1.97656 1.125 2.375V8.91406C1.33594 8.82031 1.59375 8.75 1.875 8.75H9.375ZM3.5625 4.25C3.23438 4.25 3 4.01562 3 3.6875C3 3.38281 3.23438 3.125 3.5625 3.125H7.6875C7.99219 3.125 8.25 3.38281 8.25 3.6875C8.25 4.01562 7.99219 4.25 7.6875 4.25H3.5625ZM3.5625 6.125C3.23438 6.125 3 5.89062 3 5.5625C3 5.25781 3.23438 5 3.5625 5H7.6875C7.99219 5 8.25 5.25781 8.25 5.5625C8.25 5.89062 7.99219 6.125 7.6875 6.125H3.5625Z" fill="black"/>
                        </svg>
                    )}
                </label>
            </div>

            <input
                type="text"
                value={importStatement}
                onChange={(e) => setImportStatement(e.target.value)}
                className={`w-full p-2 mb-4 rounded ${colors.cardBackground} ${colors.text} ${colors.border}`}
                placeholder="Enter import statement"
            />

            {error && (
                <div
                    className={`p-4 rounded mb-4 ${
                        isDarkMode ? "bg-red-900" : "bg-red-200"
                    } text-red-600`}
                >
                    {error}
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">▼ Props</h3>
                <table
                    className={`w-full rounded overflow-hidden shadow ${colors.cardBackground}`}
                >
                    <thead className={colors.headerBg}>
                        <tr>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Type</th>
                            <th className="p-2 text-left">Default Value</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(componentProps).map(([key, value]) => (
                            <tr
                                key={key}
                                className={`border-t ${colors.border} ${
                                    highlightedProp === key
                                        ? colors.highlightBg
                                        : ""
                                }`}
                                onMouseEnter={() => highlightProp(key)}
                                onMouseLeave={() => setHighlightedProp(null)}
                            >
                                <td className="p-2 font-medium">{key}</td>
                                <td className="p-2">{typeof value}</td>
                                <td className="p-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={renderValue(value)}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    key,
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full p-1 rounded ${colors.border} ${colors.inputText}`}
                                        />
                                    ) : (
                                        renderValue(value)
                                    )}
                                </td>
                                <td className="p-2">
                                    <select
                                        onChange={(e) =>
                                            copyToClipboard(e.target.value)
                                        }
                                        className={`p-1 rounded ${colors.buttonBg} ${colors.buttonText}`}
                                    >
                                        <option value="">Copy...</option>
                                        <option value={key}>Name</option>
                                        <option value={renderValue(value)}>
                                            Value
                                        </option>
                                        <option
                                            value={`${key}={${renderValue(
                                                value
                                            )}}`}
                                        >
                                            Prop
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-5">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">▼ Preview</h3>
                    <div
                        ref={previewRef}
                        className={`p-4 rounded shadow-inner ${colors.cardBackground}`}
                    >
                        {Component ? (
                            <Component {...componentProps} />
                        ) : (
                            <div>Loading component...</div>
                        )}
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex mb-2">
                        <button
                            onClick={() => setActiveTab("code")}
                            className={`p-2 ${
                                activeTab === "code"
                                    ? colors.activeTabBg
                                    : colors.buttonBg
                            } ${
                                colors.buttonText
                            } rounded-tl-lg cursor-pointer`}
                        >
                            View Code
                        </button>
                        <button
                            onClick={() => setActiveTab("css")}
                            className={`p-2 ${
                                activeTab === "css"
                                    ? colors.activeTabBg
                                    : colors.buttonBg
                            } ${
                                colors.buttonText
                            } rounded-tr-lg cursor-pointer`}
                        >
                            View CSS
                        </button>
                    </div>
                    <div
                        className={`p-4 rounded-b-lg shadow-inner ${colors.cardBackground}`}
                    >
                        <pre
                            className={`whitespace-pre-wrap break-words ${colors.text}`}
                        >
                            <code>
                                {activeTab === "code"
                                    ? getComponentCode()
                                    : getComponentCSS()}
                            </code>
                        </pre>
                        <button
                            onClick={() =>
                                copyToClipboard(
                                    activeTab === "code"
                                        ? getComponentCode()
                                        : getComponentCSS()
                                )
                            }
                            className={`mt-2 p-2 ${colors.buttonBg} ${colors.buttonText} rounded cursor-pointer`}
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

DynamicPropViewer.defaultProps = {
    initialImportStatement:
        "https://framer.com/m/token-ticker-for-tokens-nVMj.js@qhtVs8y8bhbchChRBqgS",
}

addPropertyControls(DynamicPropViewer, {
    initialImportStatement: {
        type: ControlType.String,
        title: "Initial Import Statement",
        defaultValue:
            "https://framer.com/m/token-ticker-for-tokens-nVMj.js@qhtVs8y8bhbchChRBqgS",
    },
})
