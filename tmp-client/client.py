import socket
import json
import time


def main():
    target_ip: str = "127.0.0.1"
    target_port: int = 12345

    # ソケットオブジェクトの作成
    tcp_client: socket.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # サーバに接続
    tcp_client.connect((target_ip, target_port))

    for i in range(20):
        # サーバにデータを送信
        send_data = sensor_data(i)
        send_data_encode = json.dumps(send_data).encode()
        tcp_client.send(send_data_encode)

        print(f" > {i}: {send_data_encode}")

        time.sleep(1 / 2)

    # ソケットを閉じる
    tcp_client.close()


def sensor_data(i: int):
    return {
        "timestamp": time.time(),
        "accelerometer": {
            "x": i,
            "y": i + 1,
            "z": i + 2,
        },
        "gyroscope": {
            "x": i + 3,
            "y": i + 4,
            "z": i + 5,
        },
    }


if __name__ == "__main__":
    main()
