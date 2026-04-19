export function createManifestContractExpectation<T extends { name: string }>(items: T[]): string[] {
  return items.map((item) => item.name);
}

export function containsAccessibilityMarkers(source: string, markers: string[]): boolean {
  return markers.every((marker) => source.includes(marker));
}

export function createQualityChecklist(items: string[]) {
  return items.map((item) => ({ item, status: 'covered' as const }));
}
