import { Modal } from "antd";
import React, { type ComponentType, Suspense, lazy, useMemo } from "react";

import { usePopupStore } from "src/context/popupContext";

const LazyLoaderPopup = () => {
	const [popupStore, updatePopupStore] = usePopupStore((store) => store);
	const [show] = usePopupStore((store) => store.show);

	const closePopup = () => {
		updatePopupStore({ show: false });
	};
	const LazyComponen = useMemo(() => {
		if (React.isValidElement(popupStore?.content)) {
			const CComponent = popupStore?.content as React.ReactNode;
			return () => CComponent;
		}

		return lazy(popupStore.content as () => Promise<{ default: ComponentType<unknown> }>);
	}, [popupStore.content]);

	return (
		<Modal
			className={`ant-modal-confirm  ${popupStore?.modalClassName}`}
			destroyOnClose
			maskClosable={false}
			open={show}
			width={popupStore.width}
			//   title={title}
			onCancel={closePopup}
			footer={null}
			//   className="core-input-modal"
			centered>
			<h2 style={{ textAlign: "center", borderBottom: "1px solid #e1e1e1" }}>{popupStore?.title || ""}</h2>

			<Suspense fallback={"loading"}>
				<LazyComponen />
			</Suspense>
		</Modal>
	);
};
export default LazyLoaderPopup;
