import { CellContentInterface } from "../CellContent/CellContentInterface";
import { CellInterface } from "./CellInterface";

export class Cell implements CellInterface {
    private content: CellContentInterface | null;
    private bombFlag: boolean;
    private hidden: boolean;

    public constructor(content: CellContentInterface | null = null) {
        this.content = content;
        this.bombFlag = false;
        this.hidden = true;
    }

    public hasBombFlag(): boolean {
        return this.bombFlag;
    }

    public insertContent(content: CellContentInterface): void {
        if (!this.content) {
            this.content = content;
        }
    }

    public changeBombFlag(): void {
        this.bombFlag = !this.bombFlag;
    }

    public unHide(): void {
        this.hidden = false;
    }

    public isHidden(): boolean {
        return this.hidden;
    }

    public getContent(): CellContentInterface | null {
        return this.content;
    }

    public getContentType(): string {
        return this.content ? this.content.getType() : 'void';
    }
}