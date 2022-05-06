package errors

type NotFound string

func (m NotFound) Error() string {
	return string(m)
}

type BadRequest string

func (m BadRequest) Error() string {
	return string(m)
}

type InternalServerError string

func (m InternalServerError) Error() string {
	return string(m)
}
