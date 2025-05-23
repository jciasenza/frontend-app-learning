import { useState } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { OverlayTrigger, Popover } from '@openedx/paragon';

import messages from './messages';

const IncompleteDonutSegment = ({ incompletePercentage }) => {
  const intl = useIntl();
  const [showIncompletePopover, setShowIncompletePopover] = useState(false);

  if (!incompletePercentage) {
    return null;
  }

  const incompleteSegmentOffset = (3.6 * incompletePercentage) / 16;
  const incompleteTooltipDegree = incompletePercentage < 100 ? incompleteSegmentOffset : 0;

  return (
    <g
      className="donut-segment-group"
      onBlur={() => setShowIncompletePopover(false)}
      onFocus={() => setShowIncompletePopover(true)}
      tabIndex="-1"
    >
      <circle
        className="donut-ring incomplete-stroke"
        cx="21"
        cy="21"
        r="15.91549430918954"
        strokeDasharray={`${incompletePercentage} ${100 - incompletePercentage}`}
        strokeDashoffset="25"
      />

      {/* Tooltip */}
      <OverlayTrigger
        show={showIncompletePopover}
        placement="top"
        overlay={(
          <Popover id="incomplete-tooltip-popover" aria-hidden="true">
            <Popover.Content>
              {intl.formatMessage(messages.incompleteContentTooltip)}
            </Popover.Content>
          </Popover>
        )}
      >
        {/* Used to anchor the tooltip within the incomplete segment's stroke */}
        <rect x="19" y="3" style={{ transform: `rotate(${incompleteTooltipDegree}deg)` }} />
      </OverlayTrigger>
    </g>
  );
};

IncompleteDonutSegment.propTypes = {
  incompletePercentage: PropTypes.number.isRequired,
};

export default IncompleteDonutSegment;
