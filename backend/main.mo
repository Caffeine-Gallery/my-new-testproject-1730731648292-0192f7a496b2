import Float "mo:base/Float";

actor Calculator {
    public func add(a : Float, b : Float) : async Float {
        a + b
    };

    public func subtract(a : Float, b : Float) : async Float {
        a - b
    };

    public func multiply(a : Float, b : Float) : async Float {
        a * b
    };

    public func divide(a : Float, b : Float) : async ?Float {
        if (b == 0) {
            null
        } else {
            ?(a / b)
        }
    };
}
