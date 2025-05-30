import { useState } from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { InfoOutline } from '@openedx/paragon/icons';
import {
  Icon, IconButton, OverlayTrigger, Popover,
} from '@openedx/paragon';
import { useContextId } from '../../../../data/hooks';
import { useModel } from '../../../../generic/model-store';

import messages from '../messages';

const GradeRangeTooltip = ({ iconButtonClassName, passingGrade }) => {
  const intl = useIntl();
  const courseId = useContextId();

  const {
    gradesFeatureIsFullyLocked,
    gradingPolicy: {
      gradeRange,
    },
  } = useModel('progress', courseId);

  const [showTooltip, setShowTooltip] = useState(false);

  const orderedGradeRange = Object.entries(gradeRange).sort((a, b) => (
    gradeRange[b[0]] - gradeRange[a[0]]
  ));

  return (
    <OverlayTrigger
      placement="top"
      trigger="click"
      show={showTooltip}
      overlay={(
        <Popover>
          <Popover.Content className="px-3">
            {intl.formatMessage(messages.courseGradeRangeTooltip)}
            <ul className="list-unstyled m-0">
              {orderedGradeRange.map((range, index) => {
                if (index === 0) {
                  return (
                    <li key={range[0]}>
                      {range[0]}: {(range[1] * 100).toFixed(0)}%-100%
                    </li>
                  );
                }
                const previousGrade = orderedGradeRange[index - 1];
                return (
                  <li key={range[0]}>
                    {range[0]}: {(range[1] * 100).toFixed(0)}%-{(previousGrade[1] * 100).toFixed(0)}%
                  </li>
                );
              })}
              <li>F: {'<'}{passingGrade}%</li>
            </ul>
          </Popover.Content>
        </Popover>
      )}
    >
      <IconButton
        onClick={() => setShowTooltip(!showTooltip)}
        onBlur={() => setShowTooltip(false)}
        alt={intl.formatMessage(messages.gradeRangeTooltipAlt)}
        className={`mb-0 mt-n1 ${iconButtonClassName}`}
        src={InfoOutline}
        iconAs={Icon}
        size="inline"
        disabled={gradesFeatureIsFullyLocked}
      />
    </OverlayTrigger>
  );
};

GradeRangeTooltip.defaultProps = {
  iconButtonClassName: '',
};

GradeRangeTooltip.propTypes = {
  iconButtonClassName: PropTypes.string,
  passingGrade: PropTypes.number.isRequired,
};

export default GradeRangeTooltip;
