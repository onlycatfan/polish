import type { Block } from "../../data/theory";
import { HighlightedText } from "../text/HighlightedText";

/** One theory block: a paragraph, a note, examples or a table */
export function TheoryBlock({ block }: { block: Block }) {
  if (block.paragraph) return <p><HighlightedText text={block.paragraph} /></p>;
  if (block.note) return <div className="theory-note"><HighlightedText text={block.note} /></div>;
  if (block.examples) {
    return (
      <div className="examples">
        {block.examples.map(([polish, translation], index) => (
          <div key={index} className="example">
            <span className="polish" lang="pl">{polish}</span>
            {translation && <span className="translation">{translation}</span>}
          </div>
        ))}
      </div>
    );
  }
  if (block.table) {
    return (
      <div className="table-box">
        <table>
          <thead>
            <tr>{block.table.header.map((cell, index) => <th key={index}><HighlightedText text={cell} /></th>)}</tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, index) => <td key={index}><HighlightedText text={cell} /></td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}
