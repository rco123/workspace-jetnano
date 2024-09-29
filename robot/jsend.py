#!/usr/bin/python3


import asyncio
import websockets
import json

async def send_commands():
    # Replace 'localhost' with your Jetson Nano's IP address if running remotely
    uri = "ws://localhost:8766"
    
    try:
        async with websockets.connect(uri) as websocket:
            print("WebSocket connection established.")

            # Example commands to send
            commands = [
                {"command": "move", "angle": 0, "speed": 20},
                {"command": "move", "angle": 10, "speed": 20},
                {"command": "move", "angle": -10, "speed": 20},
                {"command": "stop"}
            ]

            for cmd in commands:
                # Convert the command dictionary to a JSON string
                message = json.dumps(cmd)
                await websocket.send(message)
                print(f"Sent command: {message}")

                # If your server sends responses, you can receive them here
                # For now, we'll wait briefly between commands
                await asyncio.sleep(2)

    except Exception as e:
        print(f"An error occurred: {e}")

asyncio.run(send_commands())
print("end program")
