export function firstPermissionIsEquivalientToSecond(p1, p2) {
  return (
    p1.role === p2.role && (!p2.committee || p1.committee === p2.committee)
  );
}
