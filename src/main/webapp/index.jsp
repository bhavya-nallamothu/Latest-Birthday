<!DOCTYPE html>
<html>
<head>
    <title>Happy Birthday</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #ffe6ff;
            overflow: hidden;
            font-family: 'Comic Sans MS', cursive;
        }

        h1 {
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 70px;
            color: #ff1493;
            animation: glow 2s infinite alternate ease-in-out;
            text-shadow: 0 0 25px #ff69b4;
        }

        @keyframes glow {
            0% { transform: translateX(-50%) scale(1); }
            100% { transform: translateX(-50%) scale(1.1); }
        }

        /* Big rotating pink heart */
        .big-heart {
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 150px;
            color: #ff1493;
            animation: rotateHeart 4s linear infinite;
        }

        @keyframes rotateHeart {
            0% { transform: translateX(-50%) rotate(0deg); }
            100% { transform: translateX(-50%) rotate(360deg); }
        }

        .balloon {
            position: absolute;
            bottom: -100px;
            border-radius: 50%;
            opacity: 0.8;
            animation: floatUp 8s linear infinite;
        }

        @keyframes floatUp {
            0% { bottom: -150px; transform: translateX(0); }
            100% { bottom: 110%; transform: translateX(30px); }
        }

        .small-heart {
            position: absolute;
            bottom: -50px;
            color: red;
            font-size: 20px;
            animation: floatHeart 6s linear infinite;
        }

        @keyframes floatHeart {
            0% { bottom: -20px; opacity: 0; }
            100% { bottom: 110%; opacity: 1; }
        }
    </style>
</head>

<body>

<h1>🎉 Happy Birthday! 🎉</h1>

<div class="big-heart">💗</div>

<script>
    for (let i = 0; i < 20; i++) {
        let b = document.createElement("div");
        b.className = "balloon";
        b.style.width = "40px";
        b.style.height = "50px";
        b.style.left = Math.random() * 100 + "%";
        b.style.background = "hsl(" + Math.random()*360 + ", 80%, 60%)";
        b.style.animationDelay = (Math.random()*5) + "s";
        document.body.appendChild(b);
    }

    for (let i = 0; i < 15; i++) {
        let h = document.createElement("div");
        h.className = "small-heart";
        h.innerHTML = "❤️";
        h.style.left = Math.random() * 100 + "%";
        h.style.animationDelay = (Math.random()*5) + "s";
        document.body.appendChild(h);
    }
</script>

</body>
</html>
