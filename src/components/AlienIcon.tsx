import React, { useEffect, useState } from "react";

type AlienIconProps = {
    onClick: () => void;
};

const AlienIcon: React.FC<AlienIconProps> = ({ onClick }) => {
    const [opacity, setOpacity] = useState(0);
    const maxRadius = 150;
    const minRadius = 30;

    useEffect(() => {
        function handleMove(e: MouseEvent) {
            const icon = document.getElementById("alien-icon");
            if (!icon) return;

            const rect = icon.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxRadius) {
                let newOpacity = 1 - (dist - minRadius) / (maxRadius - minRadius);
                newOpacity = Math.max(0, Math.min(1, newOpacity));
                setOpacity(newOpacity);
            } else {
                setOpacity(0);
            }
        }

        document.addEventListener("mousemove", handleMove);
        return () => document.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div
            id="alien-icon"
            style={{
                position: "fixed",
                top: "20%",
                left: "10%",
                transform: "translate(-50%, -50%)",
                fontSize: "40px",
                cursor: "pointer",
                opacity,
                transition: "opacity 0.1s linear",
                zIndex: 1001,
            }}
            onClick={onClick}
        >
            👾
        </div>
    );
};

export default AlienIcon;
