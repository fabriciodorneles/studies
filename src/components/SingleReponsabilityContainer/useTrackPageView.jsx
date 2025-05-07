// 🟢 Analytics logic (separate concern)
function useTrackPageView(eventName) {
    useEffect(() => { 
        trackPageView(eventName) 
    }, [])}