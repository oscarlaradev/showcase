(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/CustomCursor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomCursor",
    ()=>CustomCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CustomCursor() {
    _s();
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomCursor.useEffect": ()=>{
            const cursor = cursorRef.current;
            if (!cursor) return;
            // Use GSAP quickTo for extreme performance
            const xTo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].quickTo(cursor, "x", {
                duration: 0.2,
                ease: "power3"
            });
            const yTo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].quickTo(cursor, "y", {
                duration: 0.2,
                ease: "power3"
            });
            const handleMouseMove = {
                "CustomCursor.useEffect.handleMouseMove": (e)=>{
                    xTo(e.clientX);
                    yTo(e.clientY);
                }
            }["CustomCursor.useEffect.handleMouseMove"];
            const handleHoverIn = {
                "CustomCursor.useEffect.handleHoverIn": ()=>cursor.classList.add("hover")
            }["CustomCursor.useEffect.handleHoverIn"];
            const handleHoverOut = {
                "CustomCursor.useEffect.handleHoverOut": ()=>cursor.classList.remove("hover")
            }["CustomCursor.useEffect.handleHoverOut"];
            window.addEventListener("mousemove", handleMouseMove);
            // Use MutationObserver or interval to attach to data-magnetic elements dynamically
            const updateMagnets = {
                "CustomCursor.useEffect.updateMagnets": ()=>{
                    document.querySelectorAll("[data-magnetic]").forEach({
                        "CustomCursor.useEffect.updateMagnets": (el)=>{
                            // Prevent duplicate listeners
                            if (el.hasAttribute("data-cursor-attached")) return;
                            el.setAttribute("data-cursor-attached", "true");
                            el.addEventListener("mouseenter", handleHoverIn);
                            el.addEventListener("mouseleave", handleHoverOut);
                        }
                    }["CustomCursor.useEffect.updateMagnets"]);
                }
            }["CustomCursor.useEffect.updateMagnets"];
            updateMagnets();
            const interval = setInterval(updateMagnets, 1000);
            return ({
                "CustomCursor.useEffect": ()=>{
                    window.removeEventListener("mousemove", handleMouseMove);
                    clearInterval(interval);
                }
            })["CustomCursor.useEffect"];
        }
    }["CustomCursor.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cursorRef,
        className: "custom-cursor"
    }, void 0, false, {
        fileName: "[project]/src/components/CustomCursor.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_s(CustomCursor, "BAOXNtFTrLv46f15Gc0vVLC8KO4=");
_c = CustomCursor;
var _c;
__turbopack_context__.k.register(_c, "CustomCursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_CustomCursor_tsx_04qdulx._.js.map