package cryptography

type Tokener interface {
	Generate(data ...interface{}) ([]byte, error)
	Validate(data []byte, hash []byte) bool
}
