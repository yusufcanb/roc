package types

type _BadRequestResponseBody struct {
	Result string
	Detail error
}

type _UnexpectedErrorResponseBody struct {
	Result string
	Detail error
}

type _SuccessResponseBody struct {
	Result  string `json:"result"`
	Payload any    `json:"payload"`
}

func BadRequestResponseBody(err error) *_BadRequestResponseBody {
	body := _BadRequestResponseBody{
		Result: "Bad Request",
		Detail: err,
	}
	return &body
}

func UnexpectedErrorResponseBody(err error) *_UnexpectedErrorResponseBody {
	body := _UnexpectedErrorResponseBody{
		Result: " Unexpected Error",
		Detail: err,
	}
	return &body
}

func SuccessResponseBody(payload any) *_SuccessResponseBody {
	body := _SuccessResponseBody{
		Result:  "success",
		Payload: payload,
	}
	return &body
}
