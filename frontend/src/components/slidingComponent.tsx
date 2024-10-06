import {FC} from "react";
import './slidingComponent.css';

interface SlidingComponentProps {
    from?: 'left' | 'right';
    duration?: number;
    children: React.ReactNode;
}

const SlidingComponent: FC<SlidingComponentProps> = ({
                                                        top = "50%",
                                                         from = 'left',
                                                         duration = 10,
                                                         children,
                                                     }) => {
    const animationName = from === 'left' ? 'slideInFromLeft' : 'slideInFromRight';

    return (
        <div
            className="sliding-component"
            style={{
                animationName: animationName,
                animationDuration: `${duration}s`,
                top: top
            }}
        >
            {children}
        </div>
    );
};

export default SlidingComponent;
