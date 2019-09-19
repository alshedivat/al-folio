module EventMachine
  module WebSocket
    module Handshake75
      def self.handshake(headers, path, secure)
        scheme = (secure ? "wss" : "ws")
        location = "#{scheme}://#{headers['host']}#{path}"

        upgrade =  "HTTP/1.1 101 Web Socket Protocol Handshake\r\n"
        upgrade << "Upgrade: WebSocket\r\n"
        upgrade << "Connection: Upgrade\r\n"
        upgrade << "WebSocket-Origin: #{headers['origin']}\r\n"
        upgrade << "WebSocket-Location: #{location}\r\n\r\n"

        return upgrade
      end
    end
  end
end
