import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "./handlers/send-console-log-1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "./handlers/send-console-log-2-when-customer-is-created.handler";
import SendConsoleLogWhenCustomerAddressIsChangedHandler from "./handlers/send-console-log-when-customer-address-is-changed.handler";

describe("Customer Domain events tests", () => {
  it("Customer Created event test", async () => {
    const eventDispatcher = new EventDispatcher();
    const sendConsoleLog1WhenCustomerIsCreatedHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const sendConsoleLog2WhenCustomerIsCreatedHandler = new SendConsoleLog2WhenCustomerIsCreatedHandler()

    const spySendConsoleLog1WhenCustomerIsCreatedHandler = jest.spyOn(sendConsoleLog1WhenCustomerIsCreatedHandler, "handle");
    const spySendConsoleLog2WhenCustomerIsCreatedHandler = jest.spyOn(sendConsoleLog2WhenCustomerIsCreatedHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1WhenCustomerIsCreatedHandler);
    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2WhenCustomerIsCreatedHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(sendConsoleLog1WhenCustomerIsCreatedHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(sendConsoleLog2WhenCustomerIsCreatedHandler);

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spySendConsoleLog1WhenCustomerIsCreatedHandler).toHaveBeenCalled();
    expect(spySendConsoleLog2WhenCustomerIsCreatedHandler).toHaveBeenCalled();
  
  });

  it("Customer Address Changed event test", async () => {
    const eventDispatcher = new EventDispatcher();
    const sendConsoleLogWhenCustomerAddressIsChangedHandler = new SendConsoleLogWhenCustomerAddressIsChangedHandler();

    const spySendConsoleLogWhenCustomerAddressIsChangedHandler = jest.spyOn(sendConsoleLogWhenCustomerAddressIsChangedHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", sendConsoleLogWhenCustomerAddressIsChangedHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(sendConsoleLogWhenCustomerAddressIsChangedHandler);

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spySendConsoleLogWhenCustomerAddressIsChangedHandler).toHaveBeenCalled();
  });
});
