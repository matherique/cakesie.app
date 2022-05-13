package cryptography

type Hasher interface {
	Hash(data []byte) ([]byte, error)
	Validate(data []byte, hash []byte) bool
}
