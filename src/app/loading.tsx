export default function Loading() {
    return (
        <div
            className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-cyan-400 animate-loadingBar"
            style={{ zIndex: 9999 }}
        />
    );
}
