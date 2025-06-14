import bcrypt
import argparse
import sys
import re

try:
    import pyperclip

    HAS_CLIPBOARD = True
except ImportError:
    HAS_CLIPBOARD = False


def encrypt_password(password: str) -> str:
    """
    Encrypts a password using bcrypt.

    Args:
        password (str): The password to encrypt.

    Returns:
        str: The encrypted password.
    """
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


def check_password(password: str, hashed_password: str) -> bool:
    """
    Validates the password against the given bcrypt hash.

    Args:
        password (str): Plain password to check.
        hashed_password (str): Bcrypt hash.

    Returns:
        bool: True if match, False otherwise.
    """
    if not is_valid_bcrypt_hash(hashed_password):
        raise ValueError("Invalid bcrypt hash format.")
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))


def is_valid_bcrypt_hash(hash_str: str) -> bool:
    """
    Quick check for bcrypt hash format.
    """
    return bool(re.fullmatch(r"\$2[abxy]?\$\d{2}\$[./A-Za-z0-9]{53}", hash_str))


def main():
    parser = argparse.ArgumentParser(description="Encrypt or check a password.")
    parser.add_argument(
        "action", choices=["encrypt", "check"], help="Action to perform"
    )
    parser.add_argument("password", nargs="?", help="Password to encrypt or check")
    parser.add_argument(
        "--hashed_password",
        help="Hashed password to check against (required for 'check')",
    )
    parser.add_argument(
        "--copy",
        action="store_true",
        help="Copy encrypted password to clipboard (if available)",
    )
    args = parser.parse_args()

    # Read password interactively if not provided
    if not args.password:
        args.password = input("Enter password: ")

    try:
        if args.action == "encrypt":
            hashed = encrypt_password(args.password)
            print(f"Encrypted Password:\n{hashed}")
            if args.copy and HAS_CLIPBOARD:
                pyperclip.copy(hashed)
                print("[Copied to clipboard]")
        elif args.action == "check":
            if not args.hashed_password:
                print("Error: --hashed_password is required for 'check' action")
                sys.exit(1)
            result = check_password(args.password, args.hashed_password)
            print("✅ Password matches!" if result else "❌ Password does not match.")
    except ValueError as e:
        print(f"[ERROR] {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()


# Example usage:
# Encrypt
# python encrypt_password.py encrypt "mypassword" --copy

# Check
# python encrypt_password.py check "mypassword" --hashed_password '$2b$12$...'
