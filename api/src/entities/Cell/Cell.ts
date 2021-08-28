import { CellContentInterface } from "../CellContent/CellContentInterface";
import { CellInterface } from "./CellInterface";

export class Cell implements CellInterface {
    private xAxis: number;
    private yAxis: number;
    private content: CellContentInterface | null;
    private bombFlag: boolean;

    public constructor(xAxis: number, yAxis: number, content: CellContentInterface | null) {
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.content = content;
        this.bombFlag = false;
    }

    public hasBombFlag(): boolean {
        return this.bombFlag;
    }

    public changeBombFlag(): void {
        this.bombFlag = !this.bombFlag;
    }

    public getContent(): CellContentInterface | null {
        return this.content;
    }

    public getContentType(): string {
        return this.content ? this.content.getType() : 'void';
    }

    public getXAxis(): number {
        return this.xAxis;
    }
    public getYAxis(): number {
        return this.yAxis;
    }

}