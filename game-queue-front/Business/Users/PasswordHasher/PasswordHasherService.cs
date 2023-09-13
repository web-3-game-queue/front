using System.Security.Cryptography;
using System.Text;

namespace game_queue_front.Business.Users {
    public class PasswordHasherService {
        int keySize = 64;
        int iterations = 350_000;
        static HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

        public string HashPassword(string password, string name) {
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                Encoding.UTF8.GetBytes(name),
                iterations,
                hashAlgorithm,
                keySize
            );
            return Convert.ToHexString(hash);
        }
    }
}
