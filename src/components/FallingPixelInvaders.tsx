"use client";
import React, { useEffect, useRef } from "react";

const INVADERS = [
    [
        ["..####..", ".######.", "########", "##.##.##", "########", "#.####.#", "#.#..#.#", "..#..#.."],
        ["..####..", ".######.", "########", "##.##.##", "########", "#.#..#.#", "#.####.#", "..#..#.."],
    ],
    [
        ["..#..#..", "...##...", "#.####.#", "########", "#.#..#.#", "########", ".#.#..#.", "#..##..#"],
        ["..#..#..", "..####..", "#.####.#", "########", "#.#..#.#", "########", "..#..#..", ".#....#."],
    ],
    [
        ["...##...", "..####..", ".######.", "##.##.##", "########", ".#.##.#.", "#.#..#.#", "#.#..#.#"],
        ["..####..", "########", ".######.", "##.##.##", "########", "#..##..#", "#.#..#.#", "#.#..#.#"],
    ],
    [
        [".###.###..", "#########.", "#########.", "#..###..#.", "#########.", "#.##.##.#.", "#.#...#.#.", "..#...#..."],
        [".###.###..", "#########.", "#########.", "#..###..#.", "#########.", "#.#.##.#..", "#..#.#..#.", "...#.#...."],
    ],
];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const choice = <T,>(arr: T[]): T => arr[(Math.random() * arr.length) | 0];
const hsl = (h: number, s: number, l: number, a = 1) =>
    `hsla(${(h % 360 + 360) % 360} ${s}% ${l}% / ${a})`;

class Alien {
    frames: string[][];
    frameIndex: number;
    cols: number;
    rows: number;
    scale: number;
    x: number;
    y: number;
    vy: number;
    hue: number;
    hueSpeed: number;
    swingPhase: number;
    frameTimer: number;
    frameDelay: number;

    constructor(x: number, scale: number) {
        this.frames = choice(INVADERS);
        this.frameIndex = 0;
        this.cols = this.frames[0][0].length;
        this.rows = this.frames[0].length;
        this.scale = scale;
        this.x = Math.round(x);
        this.y = -this.rows * this.scale - rand(10, 60);
        this.vy = rand(40, 80);
        this.hue = rand(0, 360);
        this.hueSpeed = rand(15, 50);
        this.swingPhase = rand(0, Math.PI * 2);
        this.frameTimer = 0;
        this.frameDelay = rand(200, 400);
    }

    update(dt: number) {
        this.y += this.vy * dt;
        this.swingPhase += dt * rand(1.2, 2.4);
        this.x += Math.sin(this.swingPhase) * 0.12;
        this.hue += this.hueSpeed * dt;
        this.frameTimer += dt * 1000;
        if (this.frameTimer >= this.frameDelay) {
            this.frameTimer = 0;
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
        }
    }

    offscreen(h: number) {
        return this.y - this.rows * this.scale > h + 10;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const mask = this.frames[this.frameIndex];
        const h = this.rows * this.scale;
        const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + h);
        grad.addColorStop(0, hsl(this.hue + 10, 75, 65));
        grad.addColorStop(0.5, hsl(this.hue + 40, 85, 58));
        grad.addColorStop(1, hsl(this.hue + 80, 80, 52));
        ctx.fillStyle = grad;
        for (let r = 0; r < this.rows; r++) {
            const row = mask[r];
            for (let c = 0; c < this.cols; c++) {
                if (row[c] !== "#") continue;
                const px = Math.round(this.x + c * this.scale);
                const py = Math.round(this.y + r * this.scale);
                ctx.fillRect(px, py, this.scale, this.scale);
            }
        }
    }
}

const FallingPixelInvaders: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const fitCanvas = () => {
            const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
            const w = Math.floor(window.innerWidth);
            const h = Math.floor(window.innerHeight);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = false;
        };
        fitCanvas();
        window.addEventListener("resize", fitCanvas);

        let aliens: Alien[] = [];
        let last = performance.now();
        let spawnTimer = 0;
        const spawnInterval = 1200;

        const starCanvas = document.createElement("canvas");
        const starCtx = starCanvas.getContext("2d")!;
        const buildStars = () => {
            starCanvas.width = Math.max(256, innerWidth);
            starCanvas.height = Math.max(256, innerHeight);
            const n = Math.floor((innerWidth * innerHeight) / 7000);
            starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
            for (let i = 0; i < n; i++) {
                const x = Math.random() * starCanvas.width;
                const y = Math.random() * starCanvas.height;
                const r = Math.random() * 0.9 + 0.3;
                starCtx.globalAlpha = Math.random() * 0.7 + 0.2;
                starCtx.fillStyle = `hsl(${Math.random() * 40 + 200} 80% 85%)`;
                starCtx.beginPath();
                starCtx.arc(x, y, r, 0, Math.PI * 2);
                starCtx.fill();
            }
            starCtx.globalAlpha = 1;
        };
        buildStars();
        window.addEventListener("resize", buildStars);

        const drawStars = (ctx: CanvasRenderingContext2D) => {
            ctx.globalAlpha = 0.9;
            ctx.drawImage(starCanvas, 0, 0);
            ctx.globalAlpha = 1;
        };

        const spawnOne = () => {
            const scale = Math.round(rand(6, 12));
            const margin = 24;
            const maxX = innerWidth - scale * 12 - margin;
            const x = rand(margin, Math.max(margin, maxX));
            aliens.push(new Alien(x, scale));
        };

        const frame = (ts: number) => {
            const now = ts;
            const dt = Math.min(0.032, (now - last) / 1000);
            last = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawStars(ctx);

            for (let i = aliens.length - 1; i >= 0; i--) {
                const a = aliens[i];
                a.update(dt);
                a.draw(ctx);
                if (a.offscreen(innerHeight)) aliens.splice(i, 1);
            }

            spawnTimer += dt * 1000;
            if (spawnTimer >= spawnInterval) {
                spawnTimer = 0;
                spawnOne();
            }

            requestAnimationFrame(frame);
        };

        for (let i = 0; i < 8; i++) setTimeout(spawnOne, i * 120);
        requestAnimationFrame(frame);

        return () => {
            window.removeEventListener("resize", fitCanvas);
            window.removeEventListener("resize", buildStars);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                position: "fixed"
            }}
        />
    );
};

export default FallingPixelInvaders;
