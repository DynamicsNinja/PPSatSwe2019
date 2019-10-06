import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class PPSatSweControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _notifyOutputChanged: () => void;

	private _textBoxOnChange: EventListenerOrEventListenerObject;

	private _value: string;
	private _bannedWord: string;

	private _textbox: HTMLInputElement;

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._value = context.parameters.valueField.raw == null ? "" : context.parameters.valueField.raw;
		this._bannedWord = context.parameters.bannedWord.raw == null ? "" :  context.parameters.bannedWord.raw;

		this._notifyOutputChanged = notifyOutputChanged;

		this._textBoxOnChange = this.textBoxOnChange.bind(this);

		let textbox = document.createElement("input");
		textbox.addEventListener("change", this._textBoxOnChange);
		textbox.value = this._value;
		this._textbox = textbox;

		container.appendChild(textbox);
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	public getOutputs(): IOutputs
	{
		return {
			valueField: this._value
		};
	}

	public destroy(): void
	{
		this._textbox.removeEventListener("change",this._textBoxOnChange);
	}

	public textBoxOnChange():void{
		if(this._textbox.value.indexOf(this._bannedWord) != -1){
			this._textbox.classList.add("banned-word");
			this._value = "";
		}else{
			this._textbox.classList.remove("banned-word");
			this._value =this._textbox.value ;
		}
		this._notifyOutputChanged();
	}
}


