const rewire = require("rewire")
const server = rewire("./server")
const normalizePort = server.__get__("normalizePort")
const onConnectionError = server.__get__("onConnectionError")
const onError = server.__get__("onError")
const onListening = server.__get__("onListening")
// @ponicode
describe("normalizePort", () => {
    test("0", () => {
        let callFunction = () => {
            normalizePort("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            normalizePort("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            normalizePort("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            normalizePort(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onConnectionError", () => {
    test("0", () => {
        let callFunction = () => {
            onConnectionError("multiple errors occurred")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            onConnectionError("too many arguments")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            onConnectionError("Message box: foo; bar\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            onConnectionError("invalid choice")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            onConnectionError("error")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            onConnectionError(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onError", () => {
    test("0", () => {
        let callFunction = () => {
            onError({ syscall: "Michael", code: "function(code) {\n\t\t\t\treturn I.mode === 'client' || !Basic.arrayDiff(code, [200, 404]);\n\t\t\t}" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            onError({ syscall: "George", code: "function(code) {\n\t\t\t\treturn I.mode === 'client' || !Basic.arrayDiff(code, [200, 404]);\n\t\t\t}" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            onError({ syscall: "Pierre Edouard", code: "function readToken_lt_gt(code) {\n\t      // '<>'\n\t      var next = this.input.charCodeAt(this.state.pos + 1);\n\t      var size = 1;\n\t\n\t      if (next === code) {\n\t        size = code === 62 && this.input.charCodeAt(this.state.pos + 2) === 62 ? 3 : 2;\n\t        if (this.input.charCodeAt(this.state.pos + size) === 61) return this.finishOp(_types.types.assign, size + 1);\n\t        return this.finishOp(_types.types.bitShift, size);\n\t      }\n\t\n\t      if (next === 33 && code === 60 && this.input.charCodeAt(this.state.pos + 2) === 45 && this.input.charCodeAt(this.state.pos + 3) === 45) {\n\t        if (this.inModule) this.unexpected();\n\t        // `<!--`, an XML-style comment that should be interpreted as a line comment\n\t        this.skipLineComment(4);\n\t        this.skipSpace();\n\t        return this.nextToken();\n\t      }\n\t\n\t      if (next === 61) {\n\t        // <= | >=\n\t        size = 2;\n\t      }\n\t\n\t      return this.finishOp(_types.types.relational, size);\n\t    }" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            onError({ syscall: "listen", code: "function(code) {\n\t\t\t\treturn I.mode === 'client' || !Basic.arrayDiff(code, [200, 404]);\n\t\t\t}" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            onError({ syscall: "listen", code: "EADDRINUSE" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            onError(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onListening", () => {
    test("0", () => {
        let callFunction = () => {
            onListening()
        }
    
        expect(callFunction).not.toThrow()
    })
})
