export class LocationWithDisplayName extends Location {
    private _displayName: string;

    get displayName() {
        return this._displayName;
    }

    set displayName(name: string) {
        this._displayName = name;
    }

    constructor(displayName: string) {
        super();
        this._displayName = displayName;
    }
}