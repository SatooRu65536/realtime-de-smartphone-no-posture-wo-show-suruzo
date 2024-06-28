import socket
import json
import time

target_ip: str = "127.0.0.1"
target_port: int = 12345
buffer_size: int = 4096

# 1.ソケットオブジェクトの作成
tcp_client: socket.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 2.サーバに接続
tcp_client.connect((target_ip, target_port))

for i in range(20):

    # 3.サーバにデータを送信
    print(f" > {i}")
    send_data = i
    send_data_encode = json.dumps(send_data).encode()
    tcp_client.send(send_data_encode)

    time.sleep(1/120)

# 5.ソケットを閉じる
tcp_client.close()
