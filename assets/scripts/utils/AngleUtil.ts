export class AngleUtil {
    public static getRadAngle(posA: cc.Vec2, posB: cc.Vec2): number {
        return Math.atan2(posA.y - posB.y, posA.x - posB.x);
    }

    public static getDegreeAngle(posA: cc.Vec2, posB: cc.Vec2): number {
        const rad = this.getRadAngle(posA, posB);

        return this.radToDegree(rad);
    }

    public static getDeltaAngle(centerPos: cc.Vec2, posA: cc.Vec2, posB: cc.Vec2): number {
        const radA = Math.atan2(centerPos.y - posA.y, centerPos.x - posA.x);
        const radB = Math.atan2(centerPos.y - posB.y, centerPos.x - posB.x);

        return this.radToDegree(radA) - this.radToDegree(radB);
    }

    public static radToDegree(rad: number): number {
        return rad * 180 / Math.PI + 180;
    }

    public static degreeToRad(degree: number): number {
        return (degree - 180) * Math.PI / 180;
    }
}