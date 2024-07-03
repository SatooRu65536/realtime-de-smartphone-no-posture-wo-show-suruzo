import socket
import json
import time
import random


def main():
    target_ip: str = "192.168.101.72"
    target_port: int = 12345

    # ソケットオブジェクトの作成
    tcp_client: socket.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # サーバに接続
    tcp_client.connect((target_ip, target_port))

    for i in range(200000):
        # サーバにデータを送信
        send_data = sensor_data(i)
        send_data_encode = json.dumps(send_data).encode()
        tcp_client.send(send_data_encode)

        print(f" > {i}: {send_data_encode}")

        time.sleep(1 / 30)

    # ソケットを閉じる
    tcp_client.close()


def sensor_data(i: int):
    return {
        "timestamp": time.time(),
        "accelerometer": {
            "x": 0,
            "y": 9.8,
            "z": 0,
        },
        "gyroscope": {
            "x": 0,
            "y": 0,
            "z": 0,
        },
    }


if __name__ == "__main__":
    time.time()
    main()
