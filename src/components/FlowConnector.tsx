interface FlowConnectorProps {
  /** Breakpoint from which the connector runs horizontally (vertical below it). */
  horizontalFrom: 'sm' | 'lg';
  paused?: boolean;
}

/** A line with data "packets" travelling along it. Purely decorative. */
export function FlowConnector({ horizontalFrom, paused = false }: FlowConnectorProps) {
  return (
    <span aria-hidden="true" className={`flow flow--${horizontalFrom} ${paused ? 'flow-paused' : ''}`}>
      <span className="flow-dot" />
      <span className="flow-dot" />
    </span>
  );
}
